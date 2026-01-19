// =============================================================================
// IMPORTS
// =============================================================================
import { modalRoutes } from "./route.ts";

// =============================================================================
// CODE EXAMPLES
// =============================================================================
const triggerButtonExample = `\
<button
  hx-get="/modal/dialog"
  hx-target="body"
  hx-swap="beforeend"
>
  Open Modal
</button>`;

const modalCloseExample = `\
<div
  id="modal"
  class="modal-backdrop"
  hx-on:click="if(event.target === this) this.remove()"
  hx-on:keydown="if(event.key === 'Escape') this.remove()"
>
  ...
</div>`;

// =============================================================================
// COMPONENTS
// =============================================================================
function ModalExample() {
  return (
    <div class="card">
      <div class="card-header">HTMX Modal Pattern</div>
      <div class="card-body">
        <p>Click the button below to open a modal dialog:</p>
        <button
          class="btn btn-primary"
          hx-get={modalRoutes.paths.dialog()}
          hx-target="body"
          hx-swap="beforeend"
        >
          Open Modal
        </button>
      </div>
    </div>
  );
}

function ModalCode() {
  return (
    <div class="modal-code-example">
      <h3>How it works</h3>
      <p>The trigger button uses three HTMX attributes:</p>
      <pre>{triggerButtonExample}</pre>

      <ul>
        <li>
          <code>hx-get</code> — Fetches the modal HTML from the server
        </li>
        <li>
          <code>hx-target="body"</code> — Targets the body element
        </li>
        <li>
          <code>hx-swap="beforeend"</code> — Appends the modal as the last child
          of body
        </li>
      </ul>

      <p>
        The modal uses <code>hx-on</code> for client-side behavior:
      </p>
      <pre>{modalCloseExample}</pre>
    </div>
  );
}

// =============================================================================
// MODAL RENDER
// =============================================================================
export function renderModalPage() {
  return (
    <div class="modal-example">
      <h1>Modal Example</h1>
      <p class="modal-description">
        Demonstrates how to create modals with HTMX. The modal is fetched from
        the server and appended to the page — no client-side JavaScript
        framework needed.
      </p>

      <ModalExample />
      <ModalCode />
    </div>
  );
}
