import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsGreaterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isGreaterThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const constraints = args.constraints as string[];
          const relatedPropertyName = constraints[0];

          const targetObject = args.object as Record<string, unknown>;
          const relatedValue = targetObject[relatedPropertyName];

          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            value > relatedValue
          );
        },
        defaultMessage(args: ValidationArguments): string {
          const constraints = args.constraints as string[];
          const relatedPropertyName = constraints[0];
          return `${args.property} must be greater than ${relatedPropertyName}`;
        },
      },
    });
  };
}
