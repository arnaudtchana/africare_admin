class TypevaccinAddController{
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
        //
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            let TypevaccinData = this.API.service('typevaccins')
            TypevaccinData.post({
                'nom_en': this.nom_en,
                'nom_fr': this.nom_fr
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

export const TypevaccinAddComponent = {
    templateUrl: './views/app/components/typevaccin-add/typevaccin-add.component.html',
    controller: TypevaccinAddController,
    controllerAs: 'vm',
    bindings: {}
}
