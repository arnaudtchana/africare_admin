class HopitalAddController{
    constructor($stateParams, $state, API,$localStorage){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            let HopitalData = this.API.service('hopitals')
            HopitalData.post({
                'nom': this.nom,
                'type': this.type,
                'latitude': this.latitude,
                'longitude': this.longitude,
                'region': this.region,
                'departement': this.departement,
                'localite': this.localite,
            }).then(function (response) {
                if(response.success ==true){
                    let alert = { type: 'success', 'title': 'Success!', msg: response.message }
                    $state.go($state.current, { alerts: alert})
                }else{
                    let alert = { type: 'error', 'title': 'Error!', msg: response.message }
                    $state.go($state.current, { alerts: alert})
                }

            }, function (response) {
                let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                $state.go($state.current, { alerts: alert})
            })
        }
    }

        $onInit(){
    }
}

export const HopitalAddComponent = {
    templateUrl: './views/app/components/hopital-add/hopital-add.component.html',
    controller: HopitalAddController,
    controllerAs: 'vm',
    bindings: {}
}
