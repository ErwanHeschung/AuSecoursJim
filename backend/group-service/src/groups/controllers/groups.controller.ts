import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { GroupsService } from '../services/groups.service';
import { GroupDto } from '../dto/group.dto';
import { GroupIdNotFoundException } from '../exceptions/group-id-not-found.exception';
import { GetGroupParams } from '../params/get-group.params';


@ApiTags('groups')
@Controller('/groups')
export class GroupsController {

  constructor(private readonly groupsService: GroupsService) {}

  @ApiOkResponse({ type: GroupDto, isArray: true })
  @Get()
  async findAll(): Promise<GroupDto[]> {
    return (await this.groupsService.findAll()).map(group => GroupDto.GroupDtoFactory(group));
  }

  @ApiParam({ name: 'groupId' })
  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse({ type: GroupIdNotFoundException, description: 'Group not found' })
  @Get(':groupId')
  async findByGroupId(@Param() groupParams: GetGroupParams): Promise<GroupDto> {
    return GroupDto.GroupDtoFactory(await this.groupsService.findByGroupId(groupParams.groupId));
  }

}
