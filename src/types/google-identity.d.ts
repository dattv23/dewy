type GoogleCredentialResponse = {
  credential?: string
  select_by?: string
  state?: string
}

type GoogleButtonConfiguration = {
  type?: "standard" | "icon"
  theme?: "outline" | "filled_blue" | "filled_black"
  size?: "large" | "medium" | "small"
  text?: "signin_with" | "signup_with" | "continue_with" | "signin"
  shape?: "rectangular" | "pill" | "circle" | "square"
  logo_alignment?: "left" | "center"
  width?: number
  locale?: string
}

type GoogleIdentity = {
  initialize(config: {
    client_id: string
    callback(response: GoogleCredentialResponse): void
    context?: "signin" | "signup" | "use"
    ux_mode?: "popup" | "redirect"
  }): void
  renderButton(parent: HTMLElement, options: GoogleButtonConfiguration): void
}

interface Window {
  google?: {
    accounts: {
      id: GoogleIdentity
    }
  }
}
