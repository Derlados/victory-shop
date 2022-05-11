import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './roles.decorator';
import { RoleValue } from './roles.enum';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) { }

    @Get()
    getRoles() {
        return this.rolesService.getRoles();
    }

    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        this.createRole(dto);
    }
}
