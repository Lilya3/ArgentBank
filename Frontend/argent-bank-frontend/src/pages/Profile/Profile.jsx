import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/userSlice"
import { Navigate } from "react-router-dom"


function Profile() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.user)

  const [isEditing, setIsEditing] = useState(false)
  const [editedUserName, setEditedUserName] = useState("")

  const handleEditClick = () => {
    setEditedUserName(user?.userName || "")
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUserName(user?.userName || "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: editedUserName,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur update username")
      }

      const data = await response.json()
      dispatch(setUser(data.body))
      setIsEditing(false)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!token) return

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Erreur récupération profil")
        }

        const data = await response.json()
        dispatch(setUser(data.body))
      } catch (error) {
        console.error(error)
      }
    }

    fetchProfile()
  }, [token, dispatch])

  if (!token) {
    return <Navigate to="/sign-in" />
  }

  return (
    <main className="main bg-dark">
      <div>

        <h1>
          Welcome Back
          <br />
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </h1>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editedUserName}
              onChange={(e) => setEditedUserName(e.target.value)}
            />

            <div>
              <button className="save" type="submit">Save</button>
              <button className="cancel" type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="edit" onClick={handleEditClick}>
            Edit Name
          </button>
        )}

      </div>
    </main>
  )
}

export default Profile