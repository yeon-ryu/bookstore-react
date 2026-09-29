export default function Error({ error }) {

    return <div className="error">
        <h2>에러가 발생했습니다!</h2>
        <p>{error.message}</p>
    </div>
}