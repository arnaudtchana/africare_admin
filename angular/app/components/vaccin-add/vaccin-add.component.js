class VaccinAddController{
    constructor($stateParams, $state, API,$localStorage,$scope){
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
        //
        /*on recupere la liste de tous les types de vaccins ici*/
        let Type_vaccin = this.API.service('typevaccins')
        Type_vaccin.getList()
            .then(function (response) {
                /*ici en fonciton de la langue on afficher nom_en ou nom_fr*/
                console.log(response);
                $scope.type_vaccin = response
            },function (error) {
console.log(error)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            let VaccinData = this.API.service('vaccins')
            console.log(this.$localStorage.user_id)
            VaccinData.post({
                'nom_en': this.nom_en,
                'nom_fr': this.nom_fr,
                'typevaccin_id':this.typevaccin_id,
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

export const VaccinAddComponent = {
    templateUrl: './views/app/components/vaccin-add/vaccin-add.component.html',
    controller: VaccinAddController,
    controllerAs: 'vm',
    bindings: {}
}
