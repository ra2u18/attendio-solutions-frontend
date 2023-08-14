locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  env    = terraform.workspace

  common_tags = {
    Environment = local.env
    Project     = var.prefix
    ManagedBy   = "Terraform"
    Owner       = "Rick Dev"
  }
}
