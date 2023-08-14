output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "www_bucket_name" {
  value = aws_s3_bucket.www.id
}