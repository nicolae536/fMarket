package ro.fmarket.core.validation.api;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import ro.fmarket.core.validation.impl.PasswordValidator;

/**
 * Null value is evalued as valid.
 * @author Luci
 *
 */
@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface ValidPassword {

	String message() default "Parola invalida";
	
	Class<?>[] groups() default { };
	
	Class<? extends Payload>[] payload() default { };
	
}
