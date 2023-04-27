import { useState } from "react"

const UserProfile = () => {

    const [user, setUser] = useState(JSON.parse(window.localStorage['snippet_user']))

    return (
        <div className="wrapper">
            <div>
                <h1>{user.username}</h1>
            </div>
            <div>
                {user.snippets.map(snip => (
                    <p key={snip}>
                        {snip}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default UserProfile