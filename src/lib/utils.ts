export function checkEmail(emailString: string | undefined): string | boolean {
	// For type checking
	if (typeof emailString === "undefined") {
	  return "Invalid email. No input";
	}

	// We define the emailArray AFTER checking if the emailString is undefined, or else we would have to do another check
	const emailArray = emailString?.split("@");

	// No characters in submission before/after the @ symbol.
	if (emailArray.length > 2 || emailArray[1].length < 4) {
	  return "Invalid email. short";
	}

	// Missing an @symbol
	if (!emailString.includes("@")) {
	  return "Invalid email. Missing @ symbol";
	}

	// Starts/ends with a dot
	if (emailString.startsWith(".") || emailString.endsWith(".")) {
	  return "Invalid email. Starts or ends with a dot";
	}

  // None of the if statements were true, meaning the email is valid
  return true;
}