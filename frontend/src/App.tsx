import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`

function App() {
  const [name, setName] = useState('')

  const { loading, data, refetch } =
    useQuery(GET_USERS)

  const [createUser] =
    useMutation(CREATE_USER)

  async function handleSubmit() {
    if (!name) return

    await createUser({
      variables: {
        name,
      },
    })

    setName('')

    refetch()
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

      <button onClick={handleSubmit}>
        Add User
      </button>

      <ul>
        {data.users.map((user: any) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App