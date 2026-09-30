import "./StateView.css";

export default function Loading() {

    return <div className="state-view state-view--loading"
      role="status"
      aria-live="polite"
    >
      <div className="state-view__icon" aria-hidden="true">
        <div className="state-view__spinner" />
      </div>

      <p className="state-view__title">로딩 중입니다.</p>
      <p className="state-view__message">잠시만 기다려 주세요.</p>
    </div>
}