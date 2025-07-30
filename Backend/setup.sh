#!/bin/bash

# RAD KRING AVIATION Backend Setup Script
# This script automates the backend setup process

echo "🚀 RAD KRING AVIATION Backend Setup"
echo "===================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
        
        # Check if version is >= 16
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$MAJOR_VERSION" -ge 16 ]; then
            print_status "Node.js version is compatible (>=16.0.0)"
        else
            print_error "Node.js version must be 16.0.0 or higher. Current: $NODE_VERSION"
            echo "Please upgrade Node.js from https://nodejs.org/"
            exit 1
        fi
    else
        print_error "Node.js is not installed"
        echo "Please install Node.js from https://nodejs.org/"
        exit 1
    fi
}

# Check if MongoDB is running
check_mongodb() {
    if command -v mongosh &> /dev/null; then
        if mongosh --eval "db.runCommand({ connectionStatus: 1 })" --quiet &> /dev/null; then
            print_status "MongoDB is running and accessible"
        else
            print_warning "MongoDB is installed but not running or not accessible"
            print_info "Please start MongoDB service or use MongoDB Atlas"
        fi
    elif command -v mongo &> /dev/null; then
        if mongo --eval "db.runCommand({ connectionStatus: 1 })" --quiet &> /dev/null; then
            print_status "MongoDB is running and accessible"
        else
            print_warning "MongoDB is installed but not running or not accessible"
            print_info "Please start MongoDB service or use MongoDB Atlas"
        fi
    else
        print_warning "MongoDB is not installed locally"
        print_info "You can either install MongoDB locally or use MongoDB Atlas (cloud)"
        print_info "For local installation: https://www.mongodb.com/try/download/community"
        print_info "For MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
    fi
}

# Install dependencies
install_dependencies() {
    print_info "Installing Node.js dependencies..."
    if npm install; then
        print_status "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Setup environment file
setup_environment() {
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_status "Created .env file from .env.example"
            print_warning "Please edit .env file with your configuration before running the server"
            echo ""
            print_info "Required configurations:"
            echo "  - MONGODB_URI: Your MongoDB connection string"
            echo "  - JWT_SECRET: A secure secret key (minimum 32 characters)"
            echo "  - SMTP_* variables: Email configuration for automated emails"
            echo ""
        else
            print_error ".env.example file not found"
            exit 1
        fi
    else
        print_status ".env file already exists"
    fi
}

# Validate environment file
validate_environment() {
    if [ -f ".env" ]; then
        # Check for required variables
        REQUIRED_VARS=("MONGODB_URI" "JWT_SECRET" "PORT" "NODE_ENV")
        MISSING_VARS=()
        
        for var in "${REQUIRED_VARS[@]}"; do
            if ! grep -q "^$var=" .env; then
                MISSING_VARS+=("$var")
            fi
        done
        
        if [ ${#MISSING_VARS[@]} -eq 0 ]; then
            print_status "All required environment variables are present"
        else
            print_warning "Missing required environment variables:"
            for var in "${MISSING_VARS[@]}"; do
                echo "  - $var"
            done
            print_info "Please add these variables to your .env file"
        fi
        
        # Check JWT_SECRET length
        JWT_SECRET=$(grep "^JWT_SECRET=" .env | cut -d'=' -f2)
        if [ ${#JWT_SECRET} -lt 32 ]; then
            print_warning "JWT_SECRET should be at least 32 characters long for security"
        fi
    else
        print_error ".env file not found"
    fi
}

# Seed database
seed_database() {
    print_info "Seeding database with initial data..."
    if npm run seed; then
        print_status "Database seeded successfully"
    else
        print_error "Failed to seed database"
        print_info "Make sure MongoDB is running and connection string is correct"
    fi
}

# Test server
test_server() {
    print_info "Testing server startup..."
    
    # Start server in background
    npm start &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 5
    
    # Test health endpoint
    if command -v curl &> /dev/null; then
        if curl -s http://localhost:5000/api/health &> /dev/null; then
            print_status "Server is running and responding to requests"
        else
            print_error "Server is not responding"
        fi
    else
        print_info "curl not available, skipping server test"
    fi
    
    # Kill server
    kill $SERVER_PID 2>/dev/null
}

# Main setup process
main() {
    echo "Starting automated setup process..."
    echo ""
    
    # Step 1: Check prerequisites
    print_info "Step 1: Checking prerequisites..."
    check_node
    check_mongodb
    echo ""
    
    # Step 2: Install dependencies
    print_info "Step 2: Installing dependencies..."
    install_dependencies
    echo ""
    
    # Step 3: Setup environment
    print_info "Step 3: Setting up environment configuration..."
    setup_environment
    echo ""
    
    # Step 4: Validate environment
    print_info "Step 4: Validating environment configuration..."
    validate_environment
    echo ""
    
    # Ask user if they want to seed database
    read -p "Do you want to seed the database with initial data? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Step 5: Seeding database..."
        seed_database
        echo ""
    else
        print_info "Skipping database seeding"
        echo ""
    fi
    
    # Ask user if they want to test server
    read -p "Do you want to test the server startup? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Step 6: Testing server..."
        test_server
        echo ""
    else
        print_info "Skipping server test"
        echo ""
    fi
    
    # Final instructions
    echo "🎉 Setup Complete!"
    echo "================"
    echo ""
    print_status "Backend setup is complete!"
    echo ""
    print_info "Next steps:"
    echo "  1. Edit .env file with your specific configuration"
    echo "  2. Make sure MongoDB is running"
    echo "  3. Start the development server: npm run dev"
    echo "  4. Visit http://localhost:5000/api/health to verify"
    echo ""
    print_info "For detailed documentation, see:"
    echo "  - Readme.md (setup guide)"
    echo "  - API_DOCUMENTATION.md (API reference)"
    echo ""
    print_info "Commands:"
    echo "  npm run dev    - Start development server"
    echo "  npm start      - Start production server"
    echo "  npm run seed   - Seed database with initial data"
    echo "  node test-api.js - Test all API endpoints"
}

# Run main function
main
