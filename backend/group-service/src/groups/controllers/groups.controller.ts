import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { GroupsService } from '../services/groups.service';
import { GroupDto } from '../dto/group.dto';
import { GroupIdNotFoundException } from '../exceptions/group-id-not-found.exception';
import { GetGroupParams } from '../params/get-group.params';
import { MenuItem } from '../schemas/menu-item.schema';

import { UpdateNumberOfPersonsDto } from '../dto/update-number-of-persons.dto';

@ApiTags('groups')
@Controller('/groups')
export class GroupsController {

  constructor(private readonly groupsService: GroupsService) { }

  @ApiOkResponse({ type: GroupDto, isArray: true })
  @Get()
  async findAll(): Promise<GroupDto[]> {
    return await this.groupsService.findAll();
  }

  @ApiParam({ name: 'groupId' })
  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse({ type: GroupIdNotFoundException, description: 'Group not found' })
  @Get(':groupId')
  async findByGroupId(@Param() groupParams: GetGroupParams): Promise<GroupDto> {
    return await this.groupsService.findByGroupId(groupParams.groupId);
  }


  @ApiParam({ name: 'groupId' })
  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse({ type: GroupIdNotFoundException, description: 'Group not found' })
  @Get(':groupId/menuItems')
  async getGroupMenuItems(@Param() groupParams: GetGroupParams): Promise<MenuItem[]> {
    return await this.groupsService.getGroupMenuItems(groupParams.groupId);
  }


  @ApiParam({ name: 'groupId' })
  @ApiBody({ type: UpdateNumberOfPersonsDto })
  @ApiOkResponse({ type: GroupDto, description: 'Number of persons updated' })
  @ApiNotFoundResponse({
    type: GroupIdNotFoundException,
    description: 'Group not found'
  })
  @Post(':groupId/set-number')
  async setNumberOfPersons(
    @Param('groupId') groupId: number,
    @Body('numberOfPersons') numberOfPersons: number,
  ): Promise<GroupDto> {
    return await this.groupsService.setNumberOfPersons(groupId, numberOfPersons);
  }

}