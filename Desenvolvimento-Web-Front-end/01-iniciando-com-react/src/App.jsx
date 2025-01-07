import { Header } from './components/Header'
import './global.css'
import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

const posts = [
    {
        id: 1,
        author: {
            avatarUrl: 'https://github.com/guimouraO1.png',
            name: 'Guilherme de Moura Oliveira',
            role: 'admin',
        },
        content: [
            {
                type: 'paragraph',
                content: 'Fala galeraa 👋'},
            {
                type: 'paragraph',
                content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat.'
            },
            {
                type: 'paragraph',
                content: 'O nome do projeto é DoctorCare 🚀'
            },
            {
                type: 'link',
                content: 'jane.design/doctorcare'
            }
        ],
        publishedAt: new Date('2024-12-05 20:00:00')
    },
    // {
    //     id: 2,
    //     author: {
    //         avatarUrl: 'https://github.com/diego3g.png',
    //         name: 'Diego Fernandes',
    //         role: 'user',
    //     },
    //     content: [
    //         {
    //             type: 'paragraph',
    //             content: 'Fala galeraa 👋'},
    //         {
    //             type: 'paragraph',
    //             content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat.'
    //         },
    //         {
    //             type: 'paragraph',
    //             content: 'O nome do projeto é DoctorCare 🚀'
    //         },
    //         {
    //             type: 'link',
    //             content: 'jane.design/doctorcare'
    //         }
    //     ],
    //     publishedAt: new Date('2024-12-10 20:00:00')
    // }
]

export function App() {
    return (
        <div>
            <Header/>
            <div className={styles.wrapper}>
                <Sidebar/>
                <main>
                    {posts.map(post => {
                        return <Post
                            key={post.id}
                            author={post.author}
                            content={post.content}
                            publishedAt={post.publishedAt}
                        />
                    })}
                </main>
            </div>
        </div>
    )
}