class AllergieAddController{
    constructor($stateParams, $state, API,$localStorage){
        'ngInject';
        this.$state = $state
        this.formSubmitted = false
        this.alerts = []
        this.API = API
        this.$localStorage = $localStorage
        //
        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            let AllergieData = this.API.service('allergies')
            console.log(this.$localStorage.user_id)
            AllergieData.post({
                'nom_en': this.nom_en,
                'nom_fr': this.nom_fr,
                'medecin_id': this.$localStorage.user_id
            }).then(function (response) {
                if(response.success ==true){
                    let alert = { type: 'success', 'title': 'Success!', msg: response.message }
                    $state.go($state.current, { alerts: alert})
                }else{
                    let alert = { type: 'error', 'title': 'Error!', msg: response.message }
                    $state.go($state.current, { alerts: alert})
                }

            }, function (response) {
                let alert = { type: 'error', 'title': 'Error!', msg: response.message }
                $state.go($state.current, { alerts: alert})
            })
        }
    }

    $onInit(){
    }
}

export const AllergieAddComponent = {
    templateUrl: './views/app/components/allergie-add/allergie-add.component.html',
    controller: AllergieAddController,
    controllerAs: 'vm',
    bindings: {}
}
