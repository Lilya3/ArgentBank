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
    <main className="main bg-dark-profile">
      <div className="header profile-container">
        {isEditing ? (
          <>
            <h1>Edit user info</h1>

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="input-wrapper">
                <label htmlFor="userName">User name:</label>
                <input
                  id="userName"
                  type="text"
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="firstName">First name:</label>
                <input
                  id="firstName"
                  type="text"
                  value={user?.firstName || ""}
                  disabled
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="lastName">Last name:</label>
                <input
                  id="lastName"
                  type="text"
                  value={user?.lastName || ""}
                  disabled
                />
              </div>

              <div className="profile-buttons">
                <button className="edit-button" type="submit">
                  Save
                </button>
                <button
                  className="edit-button"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1>
              Welcome Back
              <br />
              {user?.firstName} {user?.lastName}
            </h1>

            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>

      {/* COMPTES */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">
            Available Balance
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">
            View transactions
          </button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">
            Available Balance
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">
            View transactions
          </button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">
            Current Balance
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
    </main>
  )
}

export default Profile