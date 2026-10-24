# Build stage
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only the configuration first to cache dependencies safely
COPY pom.xml .

# Pre-download dependencies with a single thread to prevent network timeouts
RUN mvn dependency:go-offline -B

# Copy the rest of the application source code
COPY src ./src

# Build the package in batch mode without running tests
RUN mvn clean package -DskipTests -B

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]