module "fe_stage" {
  source = "../../../modules/services/frontend"

  providers = {
    aws               = aws
    aws.global_region = aws.global_region
  }

  prefix         = var.prefix
  env_app_domain = var.env_app_domain
}

