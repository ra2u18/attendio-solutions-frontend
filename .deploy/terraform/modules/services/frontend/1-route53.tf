data "aws_route53_zone" "main" {
  name         = var.client_app_domain
  private_zone = false
}

resource "aws_acm_certificate" "env_cert" {
  provider          = aws.global_region
  domain_name       = var.env_app_domain
  validation_method = "DNS"

  tags = local.common_tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation_record" {
  allow_overwrite = false
  ttl             = 60
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = tolist(aws_acm_certificate.env_cert.domain_validation_options)[0].resource_record_name
  records         = [tolist(aws_acm_certificate.env_cert.domain_validation_options)[0].resource_record_value]
  type            = tolist(aws_acm_certificate.env_cert.domain_validation_options)[0].resource_record_type
}

resource "aws_acm_certificate_validation" "cert_validation" {
  provider                = aws.global_region
  certificate_arn         = aws_acm_certificate.env_cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation_record.fqdn]
}
