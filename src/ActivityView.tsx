import * as React from 'react';
import axios from 'axios';
import { Activity, Attachment, AttachmentLayout } from 'botframework-directlinejs';
import { AttachmentView } from './Attachment';
import { Carousel } from './Carousel';
import { FormattedText } from './FormattedText';
import { FormatState, SizeState } from './Store';
import { IDoCardAction } from './Chat';
import { FormView } from './CustomViews/FormView';
import { TableView } from './CustomViews/TableView';
import { ChartView } from './CustomViews/ChartView';

const Attachments = (props: {
    attachments: Attachment[],
    attachmentLayout: AttachmentLayout,
    format: FormatState,
    size: SizeState,
    onCardAction: IDoCardAction,
    onImageLoad: () => void
}) => {
    const { attachments, attachmentLayout, ... otherProps } = props;
    if (!attachments || attachments.length === 0)
        return null;
    return attachmentLayout === 'carousel' ?
        <Carousel
            attachments={ attachments }
            { ... otherProps }
        />
    : 
        <div className="wc-list">
            { attachments.map((attachment, index) =>
                <AttachmentView
                    key={ index }
                    attachment={ attachment }
                    format={ props.format }
                    onCardAction={ props.onCardAction }
                    onImageLoad={ props.onImageLoad }
                />
            ) }
        </div>
}

export interface ActivityViewProps {
    format: FormatState,
    size: SizeState,
    activity: Activity,
    onCardAction: IDoCardAction,
    onImageLoad: () => void
}

export interface ActivityViewState {
    dataUrl: string,
    extendedChannelData?: any,
    channelDataLoading: boolean,
    channelDataLoaded: boolean,
    error: string,
}

export class ActivityView extends React.Component<ActivityViewProps, ActivityViewState> {
    constructor(props: ActivityViewProps) {
        super(props)
        this.state = {
            dataUrl: '',
            extendedChannelData: null,
            channelDataLoading: false,
            channelDataLoaded: false,
            error: '',
        }
    }

    componentDidMount() {
        this.loadExtendedChannelData(this.props)
    }

    loadExtendedChannelData(props: ActivityViewProps) {
        const {channelData} = props.activity
        if (channelData && channelData.type === "table") {
            if (channelData.dataUrl) {
                if (channelData.dataUrl !== this.state.dataUrl) {
                    // console.log(channelData.dataUrl)
                    this.setState({
                        dataUrl: channelData.dataUrl,
                        channelDataLoading: true, 
                        channelDataLoaded: false, 
                        error: ''
                    })
                    axios
                        .post(channelData.dataUrl)
                        .then(resp => this.setState({
                            channelDataLoading: false, 
                            channelDataLoaded: true,
                            extendedChannelData: {...channelData, data: resp.data},
                            error: ''
                        }))
                        .catch((error) => this.setState({
                            channelDataLoading: false, 
                            channelDataLoaded: false,
                            error
                        }))
                }
            }
            else {
                this.setState({channelDataLoaded: true, extendedChannelData: channelData})
            }
        }
    }

    componentWillReceiveProps(nextProps: ActivityViewProps) {
        this.loadExtendedChannelData(nextProps)
    }

    shouldComponentUpdate(nextProps: ActivityViewProps, nextState: ActivityViewState) {
        const { activity, format, size } = this.props

        const isExpanded = (activityData: any) => 
            (activityData.attachmentLayout && activityData.attachmentLayout === 'carousel')
            || (activityData.channelData !== null)

        // if the activity changed, re-render
        return activity !== nextProps.activity
        // if the format changed, re-render
            || format !== nextProps.format
        // if it's a carousel and the size changed, re-render
            || (activity.type === 'message'
                && isExpanded(activity)
                && size !== nextProps.size)
        // if channelData is newly fetched, re-render
            || (!this.state.channelDataLoaded && (nextState.channelDataLoaded || nextState.error !== ''));
    }

    render() {
        const { activity, ... props } = this.props;
        // console.log(activity);

        switch (activity.type) {
            case 'message':
                return (
                    <div>
                        <FormattedText
                            text={ activity.text }
                            format={ activity.textFormat }
                            onImageLoad={ props.onImageLoad }
                        />
                        {activity.channelData 
                        && activity.channelData.type === "form" 
                        && typeof(activity.channelData.data) === 'string'
                        && 
                        <FormView 
                            formType={0}
                            channelData={activity.channelData}
                            size={ props.size }
                        />}
                        {activity.channelData
                        && activity.channelData.type === "table"
                        && (this.state.channelDataLoaded
                            ? <TableView
                                channelData={this.state.extendedChannelData}
                                size={ props.size }
                            />
                            : this.state.channelDataLoading ? <div>Loading...</div> : <div>{this.state.error}</div>
                        )}
                        {activity.channelData
                        && activity.channelData.type === "chart"
                        &&
                        <ChartView
                            channelData={activity.channelData}
                            size={ props.size }
                        />}
                        <Attachments
                            attachments={ activity.attachments }
                            attachmentLayout={ activity.attachmentLayout }
                            format={ props.format }
                            onCardAction={ props.onCardAction }
                            onImageLoad={ props.onImageLoad }
                            size={ props.size }
                        />
                    </div>
                );

            case 'typing':
                return <div className="wc-typing"/>;
        }
    }
}