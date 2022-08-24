const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express() 

// definindo o template engine
app.set('view engine', 'ejs')



/* definindo os arquivos estáticos
const staticFolder = path.join(__dirname, 'views')
const expressStatic = express.static(staticFolder)
app.use(expressStatic)
*/

// definindo os arquivos publicos

app.use(express.static(path.join(__dirname, 'public')))


// habilita server para receber dados via post (formulario)
app.use(express.urlencoded({ extended: true }))


// MVC - MODEL VIEW CONTROLLER


// rotas
app.get('/', (req, res) => {
res.render('index', {
    title: 'Digital Tech - Home'
})
})

app.get('/posts', (req, res) => {
    res.render('Posts', {
        title: 'Digital Tech - Posts',
        posts: [
            {
                title: 'Novidade no mundo da tecnologia',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deleniti, cum animi totam velit expedita quam alias facilis eius, ullam placeat magni odit! Molestiae veritatis quasi praesentium quos numquam soluta!',
                stars: 3
            },
            {
            
            title: 'Criando um servidor com node.js',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deleniti, cum animi totam velit expedita quam alias facilis eius, ullam placeat magni odit! Molestiae veritatis quasi praesentium quos numquam soluta!',
             },
             {
            
                title: 'javascript é a linguagem mais usada no mundo!',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deleniti, cum animi totam velit expedita quam alias facilis eius, ullam placeat magni odit! Molestiae veritatis quasi praesentium quos numquam soluta!',
                    stars: 5
                 },
                
            
        ]
    })
    })

    app.get('/cadastro-posts', (req, res) => {
        const { c } = req.query
        res.render('cadastro-posts', {
            title: 'Digital Tech - Cadastrar Post',
            cadastrado: c,
        })
        })

        app.post('/salvar-post', (req, res) => {
            const { titulo, texto} = req.body

          const data = fs.readFileSync('./store/posts.json')
          const posts = JSON.parse(data)

          posts.push({
            titulo,
            texto,
          })

          const postsString = JSON.stringify(posts)
          fs.writeFileSync('./store/posts.json', postsString)

            res.redirect('/cadastro-posts?c=1')
        })


    // 404 error (not found)
    app.use((req, res) => { // middleware

        res.send('Pagina não encontrada!')
    })



// executando o servidor
const port = process.env.PORT || 8080  // caso o servidor nao escolha , usa a 8080 || quer dizer ou
app.listen(port, () => console.log(`Server is listening on port ${port}`)) // para o servidor escolher qual porta ele quer