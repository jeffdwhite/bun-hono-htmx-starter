// =============================================================================
// HELPER COMPONENTS
// =============================================================================
function ModalHeader() {
  return (
    <div class="modal-header">
      <h2 class="modal-title">Example Modal</h2>
      <button
        class="modal-close"
        hx-on:click="document.getElementById('modal').remove()"
        aria-label="Close modal"
      >
        &times;
      </button>
    </div>
  );
}

function ModalBody() {
  return (
    <div class="modal-body">
      <p>
        This modal was loaded via HTMX using <code>hx-get</code> with{" "}
        <code>hx-target="body"</code> and <code>hx-swap="beforeend"</code>.
      </p>
      <p>The modal is appended to the body and can be closed by:</p>
      <ul>
        <li>Clicking the &times; button</li>
        <li>Clicking the backdrop</li>
        <li>Pressing Escape</li>
        <li>Clicking the Cancel button</li>
      </ul>
    </div>
  );
}

function ModalFooter() {
  return (
    <div class="modal-footer">
      <button
        class="btn btn-secondary"
        hx-on:click="document.getElementById('modal').remove()"
      >
        Cancel
      </button>
      <button
        class="btn btn-primary"
        hx-on:click="alert('Confirmed!'); document.getElementById('modal').remove()"
      >
        Confirm
      </button>
    </div>
  );
}
// =============================================================================
// DIALOG BOX COMPONENT
// =============================================================================
/**
 * The modal overlay and dialog.
 *
 * Key HTMX patterns demonstrated:
 * - Uses hx-on:click to close modal without JavaScript files
 * - Uses hx-on:keydown for keyboard accessibility (Escape to close)
 * - Backdrop click closes the modal
 */
export function renderModal() {
  return (
    <div
      id="modal"
      class="modal-backdrop"
      hx-on:click="if(event.target === this) this.remove()"
      hx-on:keydown="if(event.key === 'Escape') this.remove()"
      tabindex={-1}
    >
      <div class="modal-dialog" role="dialog" aria-modal="true">
        <ModalHeader />
        <ModalBody />
        <ModalFooter />
      </div>
    </div>
  );
}
