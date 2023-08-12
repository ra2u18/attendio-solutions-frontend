resource "aws_cloudfront_origin_access_identity" "cloudfront_oai" {
  comment = "OAI for ${var.env_app_domain}"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled             = true
  retain_on_delete    = false
  is_ipv6_enabled     = false
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  aliases             = [var.env_app_domain]

  origin {
    domain_name = aws_s3_bucket.www.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.www.id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cloudfront_oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = aws_s3_bucket.www.id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    max_ttl                = 300 # 5 minutes
    default_ttl            = 300 # 5 minutes

    forwarded_values {
      query_string = true
      cookies { forward = "all" }
    }
  }

  dynamic "custom_error_response" {
    for_each = var.custom_error_responses

    content {
      error_caching_min_ttl = custom_error_response.value.error_caching_min_ttl
      error_code            = custom_error_response.value.error_code
      response_code         = custom_error_response.value.response_code
      response_page_path    = custom_error_response.value.response_page_path
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["RO"]
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.env_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = local.common_tags
}

