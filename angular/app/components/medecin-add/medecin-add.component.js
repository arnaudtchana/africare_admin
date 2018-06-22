class MedecinAddController{
    constructor(API, $state, $stateParams){
        'ngInject';
        this.$state = $state
        //this.formSubmitted = false
        this.API = API
        this.alerts = []
        //
        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }
    }

    save_compte () {
        //this.$state.go(this.$state.current, {}, { alerts: 'test' })
        console.log(this.email,this.tel);
        /*on regarde si le tel est valide*/
        console.log(this.valide_num(this.tel));
            if(this.valide_num(this.tel)){
                let Compte_temporaire = this.API.service('compte_temporaires')
                let $state = this.$state

                Compte_temporaire.post({
                    'email': this.email,
                    'tel': this.tel
                }).then(function (response) {
                    console.log(response)
                    if(response[0].success == true){
                        let alert = { type: 'success', 'title': 'Success!', msg: 'Compte temporaire crée.' }
                        $state.go($state.current, { alerts: alert})
                    }else{
                        /*on affiche le message d'erreur*/
                        alert(response[0].message);
                    }


                }, function (response) {
                    let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                    $state.go($state.current, { alerts: alert})
                })
            }else{
                this.phone_invalid = true;
                console.log(this.phone_error)
            }


    }

    valide_num (numero){
        var test = Math.floor(numero/100000000);
        if((test ===6 || test ===2 )&& numero.length ===9){
            return true;
        }else{
            return false;
        }
    }

    save_fichier () {

            let Medecin_liste = this.API.service('medecin_file')
            let $state = this.$state
        console.log(this.fichier)
            Medecin_liste.post({
                'file': this.fichier
            }).then(function (response) {
                if(response[0].success ==true){
                    let alert = { type: 'success', 'title': 'Success!', msg: 'Fichier enregistré avec succès.' }
                    $state.go($state.current, { alerts: alert})
                }else{
                    alert(response[0].message);
                }

            }, function (response) {
                let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                $state.go($state.current, { alerts: alert})
            })
    }

    $onInit(){
        this.phone_invalid = false
    }

}

export const MedecinAddComponent = {
    templateUrl: './views/app/components/medecin-add/medecin-add.component.html',
    controller: MedecinAddController,
    controllerAs: 'vm',
    bindings: {}
}
