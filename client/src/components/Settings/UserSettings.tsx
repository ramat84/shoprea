export const UserSettings = () => <div>
    <h3>User Settings</h3>

    <div className="bubble">
        <h4>Reset Password</h4>
        <form>
            <label>Old Password:</label>
            <input type="password" />
            <label>New Password:</label>
            <input type="password" />
            <button className="btn">Update</button>
        </form>
    </div>
</div>
