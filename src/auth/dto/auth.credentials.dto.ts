import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
        message: 'Username should not contain Whitespace or special characters and only lowercase letters'
    })
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak It should be combination of Uppercase, lowercase and special character and digits'
    })
    password: string;
}