import { formRoutes } from "./route.ts";
import type { ContactFormData } from "./validation.ts";
import { Input, Textarea } from "@shared/components/input.tsx";

// =============================================================================
// FORM PAGE RENDER
// =============================================================================
// Data Entry Form
export function renderFormPage(
  errors: Partial<Record<keyof ContactFormData, string>> = {},
  values: Partial<ContactFormData> = {}
) {
  return (
    <div class="form-example">
      <h1>Contact Form Example</h1>
      <p class="form-description">
        This demonstrates form handling with HTMX and Zod validation.
      </p>

      <div class="card">
        <div class="card-body">
          <form
            hx-post={formRoutes.paths.formIndex()}
            hx-target="#content"
            novalidate
          >
            <Input
              name="name"
              label="Name"
              placeholder="Your name"
              required
              value={values.name}
              error={errors.name}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
              value={values.email}
              error={errors.email}
            />
            <Textarea
              name="message"
              rows={5}
              label="Message"
              placeholder="Your message..."
              required
              value={values.message}
              error={errors.message}
            />
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                Send Message
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                hx-get={formRoutes.paths.formIndex()}
                hx-target="#content"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Form Success
export function renderFormSuccess(data: ContactFormData) {
  return (
    <div class="form-example">
      <div class="form-success">
        <div class="form-success-icon">✓</div>
        <h2>Message Sent!</h2>
        <p>Thanks {data.name}, we received your message.</p>
        <div class="form-success-details">
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Message:</strong> {data.message}
          </p>
        </div>
        <a href={formRoutes.paths.formIndex()} class="btn btn-primary">
          Send Another
        </a>
      </div>
    </div>
  );
}
