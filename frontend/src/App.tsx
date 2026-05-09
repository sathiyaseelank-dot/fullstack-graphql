// import { gql } from '@apollo/client'
import {useMutation, useQuery} from "@apollo/client/react"
import { useState } from 'react'
import {
  GetUsersDocument, 
  CreateUserDocument,
  GetFullUsersDocument,
} from './generated/graphql'
// const GET_USERS = gql`
//   query {
//     users {
//       id
//       name
//     }
//   }
// `
// const GET_FULL_USERS = gql`
//   query {
//   users{
//   id 
//   name
//   lname
//   }
//   }
// `
// const CREATE_USER = gql`
//   mutation CreateUser($name: String!, $lname: String!) {
//     createUser(name: $name, lname: $lname) {
//       id
//       name
//       lname
//     }
//   }
// `
// interface User {
//     name: string
//     id: string
//     lname?: string
//   }

//   interface GetUsersData{
//    users: User[]
//   }
function App() {
  const [name, setName] = useState('')
  const [lname, setlName] = useState('')
  const [showFull, setShowFull] = useState(false)

  const { loading, data, refetch } =
    useQuery(
      showFull?
      GetFullUsersDocument: GetUsersDocument
    )

  const [createUser] =
    useMutation(CreateUserDocument)

  async function handleSubmit() {
    if (!name) return

    await createUser({
      variables: {
        name,
        lname,
      },
      refetchQueries: [
      {
        query: showFull
        ? GetFullUsersDocument
        : GetUsersDocument,
      },
    ],
    })

    setName('')
    setlName('')
    
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>Users</h1>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Enter name"
      />
      <input
        value={lname}
        onChange={(e) =>
          setlName(e.target.value)
        }
        placeholder="Enter last name"
      />

      <button onClick={handleSubmit}>
        Add User
      </button>
      <button
  onClick={() => {
    setShowFull(true)
    refetch()
  }}
>
  Show Full Name
</button>

      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            {user.name} 
            {'lname' in user ? ` ${user.lname}` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App