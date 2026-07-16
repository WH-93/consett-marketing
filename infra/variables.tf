variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-2"
}

variable "aws_profile" {
  description = "AWS CLI profile for authentication"
  type        = string
  default     = "amble"
}
