output "cloudfront_distribution_id" {
  value = module.fe_stage.cloudfront_distribution_id
}

output "www_bucket_name" {
  value = module.fe_stage.www_bucket_name
}