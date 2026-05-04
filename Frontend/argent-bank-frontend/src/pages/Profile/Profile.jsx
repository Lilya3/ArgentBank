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
    <main className="profile">
      
      <div className="profile__header form__box">

        {isEditing ? (
          <>
            <h1 className="profile__title">Edit user info</h1>

            <form onSubmit={handleSubmit} className="form">

              <div className="form__group">
                <label>User name:</label>
                <input
                  id="userName"
                  type="text"
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                />
              </div>

              <div className="form__group">
                <label>First name:</label>
                <input
                  id="firstName"
                  type="text"
                  value={user?.firstName || ""}
                  disabled
                />
              </div>

              <div className="form__group">
                <label>Last name:</label>
                <input
                  id="lastName"
                  type="text"
                  value={user?.lastName || ""}
                  disabled
                />
              </div>

              <div className="form__group">
                <button className="form__button" type="submit">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="form__button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="profile__title">
              Welcome Back
              <br />
              {user?.firstName} {user?.lastName}
            </h1>

            <button className="profile__edit" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <section className="account">
        <div className="account__content">
          <h3 className="account__title">Argent Bank Checking (x8349)</h3>
          <p className="account__amount">$2,082.79</p>
          <p className="account__desc">Available Balance</p>
        </div>

        <div className="account__cta">
          <button className="account__button">
            <span className="account__button-text">
              View transactions
            </span>
            <i className="fa fa-chevron-right account__arrow"></i>
          </button>
        </div>

      </section>

      <section className="account">
        <div className="account__content">
          <h3 className="account__title">Argent Bank Savings (x6712)</h3>
          <p className="account__amount">$10,928.42</p>
          <p className="account__desc">Available Balance</p>
        </div>
        
        <div className="account__cta">
          <button className="account__button">
            <span className="account__button-text">
              View transactions
            </span>
            <i className="fa fa-chevron-right account__arrow"></i>
          </button>
        </div>

      </section>

      <section className="account">
        <div className="account__content">
          <h3 className="account__title">Argent Bank Credit Card (x8349)</h3>
          <p className="account__amount">$184.30</p>
          <p className="account__desc">
            Current Balance
          </p>
        </div>
        <div className="account__cta">
          <button className="account__button">
            <span className="account__button-text">
              View transactions
            </span>
            <i className="fa fa-chevron-right account__arrow"></i>
          </button>
        </div>

      </section>
    </main>
  )
}

export default Profile