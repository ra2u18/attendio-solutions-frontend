variable "prefix" {
  type        = string
  description = "Prefix for stage env"
  default     = "asolution-fe"
}

# This is the environment client app domain, different for each environment
variable "env_app_domain" {
  type        = string
  description = "Environment client app domain"
  default     = "stage.attendiosolutions.co"
}

variable "local_region" {
  type        = string
  description = "Frankfurt region"
  default     = "eu-central-1"
}

variable "global_region" {
  type        = string
  description = "Global region"
  default     = "us-east-1"
}