window.addEventListener("DOMContentLoaded", async () => {

    const reponse = await fetch("http://localhost:3000/depenses")
    const depenses = await reponse.json();

    document.querySelector(".js-list-depenses").innerHTML = genererFormsTaches(depenses);

    // gestion du nombre de tâches en cours 
    document.querySelector(".js-compteur").innerHTML = depenses.filter(depense => depense).length;


    // écouter quand on clique dans la zone js-list-tache
    document.querySelector(".js-list-depenses").addEventListener("click", async e => {
        e.preventDefault();
        if (e.target.className.includes("btn")) {
            const form = e.target.parentNode.parentNode.firstElementChild.firstElementChild
            const action = e.target.value;
            const id = form.id.value
            console.log(form.id)
            if (action == "modifier") {
                const data = {
                    id: id,
                    name: form.name.value,
                    montant: form.montant.value
                }
                
                const options = { method: "PUT", body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }
                await fetch("http://localhost:3000/depenses/" + id, options)
            } else if (action == "supprimer") {
                const options = { method: "DELETE" }
                await fetch("http://localhost:3000/depenses/" + id, options);
            }
        }
    })
})

function genererFormsTaches(data) {

    if (data.length === 0) return "<p>Veuillez ajouter des dépenses / recettes</p>";

    return data.map(d => {
        return ` 
                    <tr>
                        <td><form id="form${d.id}"><input form="form${d.id}" name="id" class="form-input" value="${d.id}" readonly></form></td>
                        <td><input type="text" form="form${d.id}" name="name" class="form-input" value="${d.name}"></td>
                        <td><input type="text" form="form${d.id}" name="montant" class="form-input" value="${d.montant}"></td>
                        <td>
                        <input type="submit" form="form${d.id}" class="btn btn-primary mx-3" value="modifier">
                        <input type="submit" form="form${d.id}" class="btn btn-danger" value="supprimer">
                        </td>
                    </tr>
                
    `
    }).join("")

    // <form class="d-flex my-3">
    //                 <input type="hidden" name="id" class="form-input">
    //                 <input type="text" name="name" class="form-input">
    //                 <select name="status" class="form-select mx-3">
    //                     <option value="0">encours</option>
    //                     <option value="1">finie</option>
    //                 </select>
    //                 <input type="submit" class="btn btn-primary mx-3" value="modifier">
    //                 <input type="submit" class="btn btn-danger" value="supprimer">
    //             </form>
}