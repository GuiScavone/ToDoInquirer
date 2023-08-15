//import libraryDB from './old-db.json';
const libraryDB = require('./old-db.json')

class Task {
    constructor(){
        this.library= libraryDB;
        this.alugados= [];
    }

    addingBook(title, author, isbn, genre, status){
        let book= {title, author,isbn,genre,status};
        this.library.push(book);
        return book;
    }
    seeLibrary(){
        console.log("Lista de Livros: ")
        return this.library;
    }


    //será necessário alterar o metodo "alugarLivro" para receber mais detalhes sobre o livro?. 
    //Fazer apenas um push dps livros Borrowed para o array alugados? 
    updateList(){
    
    }

    seeAlugados(){
        console.log("Alugados: ")
        return this.alugados;
    }


    /* ao adicionar o livro como sendo alugado(array alugados) adicionar a data para retorno para ser utilizada no tracking. 
    adicionar quem alugou (nome). 
    Outra solução poderia ser no array de alugados, apenas colocar alguma informação sobre o aluger e a info basica do livro.
    Ao ser alugado, teriamos de alterar no array library o campo status, iriamos também ter um metodo (returnLivro) que iria ser 
    reponsavel por voltar a alterar a infromação nos arrays*/
    alugarLivro(nomeCliente, nomeLivro){
        const indexLivro = this.library.findIndex(item => item.title === nomeLivro);

        if(this.library[indexLivro].status === "Available"){
            this.library[indexLivro].status = "Borrowed";
            const dataAluguer= new Date();
            const dataPrevistaEntrega = new Date(dataAluguer);
            dataPrevistaEntrega.setDate(dataPrevistaEntrega.getDate() + 30);
            const infoAluguer ={
                cliente: nomeCliente,
                livro: nomeLivro,
                dataAluguer: dataAluguer.toISOString(),
                dataPrevistaEntrega : dataPrevistaEntrega.toISOString()
            };
            this.alugados.push(infoAluguer);
        }
        
    }

    devolverLivro(nomeLivro){
        const indexLivro = this.library.findIndex(item => item.title === nomeLivro);

        if(this.library[indexLivro].status === "Borrowed"){
            this.library[indexLivro].status = "Available";
            const indexLivroALugado = this.alugados.findIndex(item => item.livro === nomeLivro);  
            this.alugados.splice(indexLivroALugado,1);
        }
        
    }


    //consultar os livros que estão disponiveis,mostrar todos? receber algum argumento para filtrar?
    findAvailable(){
        console.log("Lista de livros disponiveis: ")
        return this.library.filter(item => item.status === "Available")
                           .map(item => {
                                return{
                                    title: item.title,
                                    author: item.author,
                                    genre: item.genero
                                };
                            });
    }


    //receber argumento o genero e apresentar esses livros
    sortingByGenre(genre){
        console.log(`Livros ${genre} disponiveis:`)
        return this.library.filter(item => item.genre === genre);

    }


    //Utilizar o array que guarda os livros que estão alugados, retornar a contagem desses livros.
    countBorrowed(){
        console.log("Numero de livros Alugados:")
        return this.alugados.length;
        

    }
    // utilizar o array dos livros alugados para fazer a contagem dos dias que faltam para a terminar a data de aluguer?
    trackDueDate(){
        const dataAtual = new Date();

        this.alugados.forEach(item => {
            const dueDate = new Date(item.dataPrevistaEntrega);
            const diffTime = dueDate.getTime() - dataAtual.getTime();
            const diasEmFalta= Math.ceil(diffTime / (1000 * 3600 * 24));// colocar o resultado final 
            console.log(`Cliente: ${item.cliente}, Livro: ${item.livro}, Dias restantes: ${diasEmFalta}`);
        })
    } 
}


let livro = new Task();

/*
livro.addingBook("The Art of Programming",
"John Smith",
"978-0-123456-78-9",
"Computer Science",
"Available");

livro.addingBook("A Tale of Magic",
"Jane Doe",
"978-0-987654-32-1",
"Fantasy",
"Available");

livro.addingBook("The Mystery of the Hidden Key",
"Michael Brown",
"9978-1-234567-89-0",
"Mystery",
"Available"); */

console.log(livro.seeLibrary());

livro.alugarLivro("Manel","A Tale of Magic");
livro.alugarLivro("Joana","The Mystery of the Hidden Key");
console.log(livro.seeLibrary());
console.log(livro.seeAlugados());

//livro.devolverLivro("A Tale of Magic");

//console.log(livro.seeLibrary());
//console.log(livro.seeAlugados()); 
//console.log(livro.findAvailable());
//console.log(livro.sortingByGenre("Fantasy"));
console.log(livro.countBorrowed());
livro.trackDueDate();

