import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/userSlice"


function Profile() {

  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)

  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
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

    if (token) {
      fetchProfile()
    }
  }, [token, dispatch])

  return (
    <main className="main bg-dark">
      <h1>
        Welcome Back
        <br />
        {user?.firstName} {user?.lastName}
      </h1>
    </main>
  )
}

export default Profile