terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.90.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "opsgenie_ai" {
  name     = "rg-opsgenie-ai"
  location = "eastus"
}

resource "azurerm_container_app_environment" "opsgenie_ai" {
  name                = "opsgenie-ai-env"
  resource_group_name = azurerm_resource_group.opsgenie_ai.name
  location            = azurerm_resource_group.opsgenie_ai.location
}

output "resource_group" {
  value = azurerm_resource_group.opsgenie_ai.name
}
