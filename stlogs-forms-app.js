(function() {
  'use strict';
  var TOKEN_KEY = '(*&(Y#@HIUH(W*R';
  var API =
    document.location.href.indexOf('stlogs.azurewebsites.net') > 0
      ? 'https://stlogs.azurewebsites.net'
      : 'https://stlogs-staging.azurewebsites.net';
  var TABS = {
    OPERATION: 'OPERATION',
    MANPOWER: 'MANPOWER'
  };

  var DEPARTMENTS = {
    AVIVATION: 'STLogsAviation',
    DEFENCE: 'DEFENCE',
    HEALTHCARE: 'HEALTHCARE',
    PSS: 'PSS'
  };

  var AVIVATION_OPERATION_FORM = [
    {
      heading: "Today's Operations:",
      groups: [
        {
          title: 'Air freight',
          fields: [
            {
              label: 'Import:',
              name: 'today_air_freight_import'
            },
            {
              label: 'Export',
              name: 'today_air_freight_export'
            },
            {
              label: 'Traffic',
              name: 'today_air_freight_traffic'
            }
          ]
        },
        {
          title: 'Sea freight',
          fields: [
            {
              label: 'Import:',
              name: 'today_atoday_sea_freight_import'
            },
            {
              label: 'Export',
              name: 'today_sea_freight_export'
            },
            {
              label: 'Traffic',
              name: 'today_sea_freight_traffic'
            }
          ]
        },
        {
          title: 'Stars',
          fields: [
            {
              label: 'Refuelling:',
              name: 'today_stars_refuelling'
            },
            {
              label: 'AMC:',
              name: 'today_stars_amc'
            },
            {
              label: 'DSR Refuelling: Defuelling: Bridging:',
              name: 'today_stars_dsr_refuelling_defuelling_bridging'
            }
          ]
        },
        {
          title: 'Aml',
          fields: [
            {
              label: 'RSAF Tech Log:',
              name: 'today_aml_rsaf_tech_log'
            },
            {
              label: 'RSN ShipHusbandry:',
              name: 'today_aml_rsn_shiphusbandry'
            },
            {
              label: 'Other Ops:',
              name: 'today_aml_other_ops'
            }
          ]
        },
        {
          label: 'Incident:',
          name: 'today_incident'
        }
      ]
    },
    {
      heading: 'Key Highlight For Next Day:',
      groups: [
        {
          title: 'Air freight',
          fields: [
            {
              label: 'Import:',
              name: 'today_air_freight_import'
            },
            {
              label: 'Export',
              name: 'today_air_freight_export'
            },
            {
              label: 'Traffic',
              name: 'today_air_freight_traffic'
            }
          ]
        },
        {
          title: 'Sea freight',
          fields: [
            {
              label: 'Import:',
              name: 'today_atoday_sea_freight_import'
            },
            {
              label: 'Export',
              name: 'today_sea_freight_export'
            },
            {
              label: 'Traffic',
              name: 'today_sea_freight_traffic'
            }
          ]
        },
        {
          title: 'Stars',
          fields: [
            {
              label: 'Refuelling:',
              name: 'today_stars_refuelling'
            },
            {
              label: 'AMC:',
              name: 'today_stars_amc'
            },
            {
              label: 'DSR Refuelling: Defuelling: Bridging:',
              name: 'today_stars_dsr_refuelling_defuelling_bridging'
            }
          ]
        },
        {
          title: 'Aml',
          fields: [
            {
              label: 'RSAF Tech Log:',
              name: 'today_aml_rsaf_tech_log'
            },
            {
              label: 'RSN ShipHusbandry:',
              name: 'today_aml_rsn_shiphusbandry'
            },
            {
              label: 'Other Ops:',
              name: 'today_aml_other_ops'
            }
          ]
        },
        {
          label: 'Incident:',
          name: 'today_incident'
        }
      ]
    }
  ];
  var AVIVATION_MANPOWER_FORM = [
    {
      heading: 'Manpower Status - Aviation',
      groups: [
        { label: 'Mpcon', name: 'Mpcon' },
        { label: 'Impact', name: 'Impact' },
        { label: 'Overall Strength', name: 'OverallStrength' },
        { label: 'Overall Present', name: 'OverallPresent' },
        { label: 'Overall Overseas', name: 'OverallOverseas' },
        { label: 'Overall Leave', name: 'OverallLeave' },
        { label: 'Overall Medical', name: 'OverallMedical' },
        { label: 'Overall Mpcon', name: 'OverallMpcon' },
        { label: 'Stars Strength', name: 'StarsStrength' },
        { label: 'Stars Present', name: 'StarsPresent' },
        { label: 'Stars Overseas', name: 'StarsOverseas' },
        { label: 'Stars Leave', name: 'StarsLeave' },
        { label: 'Stars Medical', name: 'StarsMedical' },
        { label: 'Stars Mpcon', name: 'StarsMpcon' },
        { label: 'Aml Strength', name: 'AmlStrength' },
        { label: 'Aml Present', name: 'AmlPresent' },
        { label: 'Aml Overseas', name: 'AmlOverseas' },
        { label: 'Aml Leave', name: 'AmlLeave' },
        { label: 'Aml Medical', name: 'AmlMedical' },
        { label: 'Aml Mpcon', name: 'AmlMpcon' },
        { label: 'Freight Strength', name: 'FreightStrength' },
        { label: 'Freight Present', name: 'FreightPresent' },
        { label: 'Freight Overseas', name: 'FreightOverseas' },
        { label: 'Freight Leave', name: 'FreightLeave' },
        { label: 'Freight Medical', name: 'FreightMedical' },
        { label: 'Freight Mpcon', name: 'FreightMpcon' }
      ]
    }
  ];
  var AVIVATION_REDCON_FORM = [
    {
      heading: 'Redcon',
      groups: [
        { label: 'Redcon', name: 'Redcon' },
        { label: 'Impact', name: 'Impact' },
        { label: 'Overall Fleet', name: 'OverallFleet' },
        { label: 'Overall Serviceable', name: 'OverallServiceable' },
        { label: 'Overall Unserviceable', name: 'OverallUnserviceable' },
        { label: 'Overall Workshop', name: 'OverallWorkshop' },
        { label: 'Overall Redcon', name: 'OverallRedcon' },
        { label: 'Stars Fleet', name: 'StarsFleet' },
        { label: 'Stars Serviceable', name: 'StarsServiceable' },
        { label: 'Stars Unserviceable', name: 'StarsUnserviceable' },
        { label: 'Stars Workshop', name: 'StarsWorkshop' },
        { label: 'Stars Redcon', name: 'StarsRedcon' },
        { label: 'Aml Fleet', name: 'AmlFleet' },
        { label: 'Aml Serviceable', name: 'AmlServiceable' },
        { label: 'Aml Unserviceable', name: 'AmlUnserviceable' },
        { label: 'Aml Workshop', name: 'AmlWorkshop' },
        { label: 'Aml Redcon', name: 'AmlRedcon' },
        { label: 'Freight Fleet', name: 'FreightFleet' },
        { label: 'Freight Serviceable', name: 'FreightServiceable' },
        { label: 'Freight Unserviceable', name: 'FreightUnserviceable' },
        { label: 'Freight Workshop', name: 'FreightWorkshop' },
        { label: 'Freight Redcon', name: 'FreightRedcon' }
      ]
    }
  ];

  var app = new Vue({
    el: '#app',
    data: {
      user: {
        loggedin: false,
        logining: false,
        username: 'aviation@stlogs.com',
        password: 'Aviation536$',
        loginBtnText: 'Login',
        userDepartment: '',
        token: ''
      },
      tabActive: TABS.MANPOWER,
      avivationManpower: {
        submitting: false,
        fields: AVIVATION_MANPOWER_FORM,
        model: {
          Mpcon: '',
          Impact: '',
          OverallStrength: '',
          OverallPresent: '',
          OverallOverseas: '',
          OverallLeave: '',
          OverallMedical: '',
          OverallMpcon: '',
          StarsStrength: '',
          StarsPresent: '',
          StarsOverseas: '',
          StarsLeave: '',
          StarsMedical: '',
          StarsMpcon: '',
          AmlStrength: '',
          AmlPresent: '',
          AmlOverseas: '',
          AmlLeave: '',
          AmlMedical: '',
          AmlMpcon: '',
          FreightStrength: '',
          FreightPresent: '',
          FreightOverseas: '',
          FreightLeave: '',
          FreightMedical: '',
          FreightMpcon: ''
        }
      },
      avivationRedcon: {
        submitting: false,
        fields: AVIVATION_REDCON_FORM,
        model: {
          Impact: '',
          Redcon: '',
          OverallFleet: '',
          OverallServiceable: '',
          OverallUnserviceable: '',
          OverallWorkshop: '',
          OverallRedcon: '',
          StarsFleet: '',
          StarsServiceable: '',
          StarsUnserviceable: '',
          StarsWorkshop: '',
          StarsRedcon: '',
          AmlFleet: '',
          AmlServiceable: '',
          AmlUnserviceable: '',
          AmlWorkshop: '',
          AmlRedcon: '',
          FreightFleet: '',
          FreightServiceable: '',
          FreightUnserviceable: '',
          FreightWorkshop: '',
          FreightRedcon: ''
        }
      },
      avivationOperation: {
        submitting: false,
        fields: AVIVATION_OPERATION_FORM,
        model: {}
      }
    },
    computed: {
      operationTabActive: function() {
        return this.tabActive === TABS.OPERATION;
      },
      manpowerTabActive: function() {
        return this.tabActive === TABS.MANPOWER;
      },
      isAvivation: function() {
        return this.user.userDepartment === DEPARTMENTS.AVIVATION;
      },
      isDefence: function() {
        return this.user.userDepartment === DEPARTMENTS.DEFENCE;
      },
      isHealthcare: function() {
        return this.user.userDepartment === DEPARTMENTS.HEALTHCARE;
      },
      isPSS: function() {
        return this.user.userDepartment === DEPARTMENTS.PSS;
      },
      avivationManpowerFormSubmitText: function() {
        return this.avivationManpower.submitting ? 'Submitting...' : 'Submit';
      },
      loginBtnText: function() {
        return this.user.logining ? 'Logining...' : 'Login';
      },
      avivationRedconFormSubmitText: function() {
        return this.avivationRedcon.submitting ? 'Submitting...' : 'Submit';
      }
    },
    methods: {
      login: function() {
        var self = this;

        this.user.logining = true;

        axios({
          url: 'https://botbotidentity.azurewebsites.net/connect/token',
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify({
            username: this.user.username,
            password: this.user.password,
            client_id: 'botbotclient',
            client_secret: 'botbotsecret',
            grant_type: 'password'
          })
        })
          .then(function(resp) {
            var roles = resp.data.roles;
            self.user.userDepartment = roles && roles[0];

            self.user.logining = false;

            self.user.loggedin = true;
            localStorage.setItem(TOKEN_KEY, resp.data.access_token);
          })
          .catch(function(error) {
            self.user.logining = false;
            self.user.token = '';
            self.user.userDepartment = '';

            console.log('error', error);
          });
      },
      showOperation: function() {
        this.tabActive = TABS.OPERATION;
      },
      showManpower: function() {
        this.tabActive = TABS.MANPOWER;
      },
      doAvivationOperationSubmit: function() {},
      doAvivationRedconSubmit: function() {
        var self = this;
        self.avivationRedcon.submitting = true;

        axios({
          url: API + '/api/form/redcon',
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
          },
          data: this.avivationRedcon.model
        })
          .then(function(resp) {
            self.avivationRedcon.submitting = false;
            console.log('data', resp);
          })
          .catch(function(error) {
            self.avivationRedcon.submitting = false;
            console.log('error', error);
          });
      },
      doAvivationManpowerSubmit: function() {
        var self = this;
        self.avivationManpower.submitting = true;

        axios({
          url: API + '/api/form/mpcon',
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
          },
          data: this.avivationManpower.model
        })
          .then(function(resp) {
            self.avivationManpower.submitting = false;
            console.log('data', resp);
          })
          .catch(function(error) {
            self.avivationManpower.submitting = false;
            console.log('error', error);
          });
      }
    }
  });
})();
