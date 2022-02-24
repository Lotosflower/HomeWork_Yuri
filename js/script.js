const Todo = function() {

    this.init = () => {
        this.getTodo();
    }

    this.getTodo = async () => {
        let url='https://jsonplaceholder.typicode.com/todos'

        try{
            response = await fetch(url)
            data = await response.json()
            this.show(data)
        } catch (e) {
            console.error(e)
        } finally {
            console.log('finally')
        }

        localStorage.setItem(`listData`, JSON.stringify(data))
    }

    this.delete = function(id){
        let idNumber = id
        data = data.filter((_, index) => index != idNumber)
        this.show()

    };



    this.show = (data) => {
        let todo = document.querySelector('.todo');
        if (!todo) return 

        

        let ul = document.querySelector('.todo__list')
        if(!ul) {
            ul = document.createElement('ul')
            ul.classList.add('todo__list')
        }

        let list = ''

        data.forEach(({completed, id, title}, index ) => {
            list += `
                    <li>
                        <div class = "data__cross">${id} <input type="checkbox" ${completed ? 'checked' : ""}><span >${title}</span><button class = "delete__btn" id="${index}">delete</button></div>
                    </li>`        
        });

        let h2 = document.createElement(`h2`);
       
        h2.innerHTML = `List i have to do`

        document.body.insertBefore(h2, document.body.firstElementChild);

        ul.innerHTML = list;
        todo.appendChild(ul);
        //console.log(data)

        let deleteBtns = document.querySelectorAll(`.delete__btn`)
        deleteBtns.forEach((deleteBtn) =>{
        deleteBtn.addEventListener(`click`, (event)=>{
        //console.log(event.target.ids)
        this.delete(event.target.id)
})

})
};


}






window.addEventListener('load', ()=>{
    const todoList = new Todo()
    todoList.init();
})

