# This is the base client app domain, same for all environments
variable "client_app_domain" {
  type        = string
  description = "Main client app domain"
  default     = "attendiosolutions.co"
}

variable "prefix" {
  type        = string
  description = "Prefix for env based FE resources"
}

# This is the environment client app domain, different for each environment
variable "env_app_domain" {
  type        = string
  description = "Environment client app domain"
}

variable "custom_error_responses" {
  type = list(object({
    error_caching_min_ttl = number
    error_code            = number
    response_code         = number
    response_page_path    = string
  }))
  description = "List of one or more custom error response element maps"
  default = [
    {
      error_caching_min_ttl = 10
      error_code            = 400
      response_code         = 200
      response_page_path    = "/index.html"
    },
    {
      error_caching_min_ttl = 10
      error_code            = 403
      response_code         = 200
      response_page_path    = "/index.html"
    },
    {
      error_caching_min_ttl = 10
      error_code            = 404
      response_code         = 200
      response_page_path    = "/index.html"
    },
    {
      error_caching_min_ttl = 10
      error_code            = 405
      response_code         = 200
      response_page_path    = "/index.html"
    }
  ]
}
