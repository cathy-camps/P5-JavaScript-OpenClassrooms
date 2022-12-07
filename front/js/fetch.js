//contacter API pour récupérer codes postaux dans un formulaire
document.querySelector('#cp').addEventListener('input', function(){
    if(this.value.length == 5){
        let url = 'https://geo.api.gouve.fr/etc';

        fetch(url).then((res) =>
        res.json()
        .then((data)=> {
            console.log(data);
//crée une liste à puces des villes 
            let print = `<ul>`; 
//boucle pour lister le tableau récupéré  : boucle de console.log de data
            for(let city of data){
                print += `<li>${ville.nom} - ${ville.population}</li>` //crée une liste pour récuperer le nom de la ville et la pop dans l'array
            }
                print += `<ul>`
                document.querySelector('#villes').innerHTML = print; //ajouter la liste au HTML
        })
        ).catch(err=> console.log('Erreur : ' + err));
    }
});

//cours sur les promesses 
const promise = new Promise(function(resolve, reject){
    if(typeof USERS !== 'undifined'){
        resolve(USERS);
    }else {
        reject('Accès aux users impossible');
    }
});
//capter l'état de la promesse
promise 
.then(function(users){
        let liste = `<ul>`;
        for (let user of users){
            liste += '<li>${user.title}</li>';
        }
        liste += `</ul>`;
        document.querySelector('#users').innerHTML = liste;
    }
.catch(function(erreur){
    console.log(erreur);
})
)