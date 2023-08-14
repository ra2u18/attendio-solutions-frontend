terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  # asolutions-tfstate-bucket/frontend/stage/terraform.tfstate
  backend "s3" {
    bucket               = "asolutions-tfstate-bucket"
    key                  = "terraform.tfstate"
    workspace_key_prefix = "frontend"
    region               = "eu-central-1"

    # dynamo db details for locking
    dynamodb_table = "asolutions-tfstate-bucket-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.local_region
}

provider "aws" {
  alias  = "global_region"
  region = var.global_region
}