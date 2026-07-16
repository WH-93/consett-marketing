output "cloudfront_domain" {
  description = "CloudFront distribution URL for demo"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "cloudfront_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = aws_cloudfront_distribution.site.id
}

output "s3_bucket" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.site.id
}

output "s3_website_endpoint" {
  description = "S3 static website endpoint"
  value       = aws_s3_bucket_website_configuration.site.website_endpoint
}
