import "@/css/StateView.css";

export default function Error({ error }) {

    return <div className="state-view state-view--empty">
      <p className="state-view__title">{error.message}</p>
      <div className="state-view__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M3 13l3-8h12l3 8" />
          <path d="M3 13v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6" />
          <path d="M3 13h5l1.5 2.5h5L16 13h5" />
        </svg>
      </div>
    </div>
}