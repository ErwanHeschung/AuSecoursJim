import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { GroupsService } from '../services/groups.service';
import { GroupDto } from '../dto/group.dto';
import { GroupIdNotFoundException } from '../exceptions/group-id-not-found.exception';
import { GetGroupParams } from '../params/get-group.params';
import { MenuItem } from '../schemas/menu-item.schema';

@ApiTags('groups')
@Controller('/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOkResponse({ type: GroupDto, isArray: true })
  @Get()
  async findAll(): Promise<GroupDto[]> {
    return await this.groupsService.findAll();
  }

  @ApiParam({ name: 'groupId' })
  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse({
    type: GroupIdNotFoundException,
    description: 'Group not found',
  })
  @Get(':groupId')
  async findByGroupId(@Param() groupParams: GetGroupParams): Promise<GroupDto> {
    return await this.groupsService.findByGroupId(groupParams.groupId);
  }

  @ApiParam({ name: 'groupId' })
  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse({
    type: GroupIdNotFoundException,
    description: 'Group not found',
  })
  @Get(':groupId/menuItems')
  async getGroupMenuItems(
    @Param() groupParams: GetGroupParams,
  ): Promise<MenuItem[]> {
    return await this.groupsService.getGroupMenuItems(groupParams.groupId);
  }

  @ApiParam({ name: 'groupId' })
  @ApiQuery({
    name: 'numberOfPersons',
    type: Number,
    description: 'Number of people joining the group',
  })
  @ApiOkResponse({ type: GroupDto, description: 'Number of persons updated' })
  @ApiNotFoundResponse({
    type: GroupIdNotFoundException,
    description: 'Group not found',
  })
  @Post(':groupId/join')
  async joinGroup(
    @Param('groupId') groupId: number,
    @Query('numberOfPersons') numberOfPersons: number,
  ): Promise<GroupDto> {
    return await this.groupsService.join(groupId, numberOfPersons);
  }

  @ApiParam({ name: 'groupId' })
  @ApiOkResponse({ type: GroupDto, description: 'Group is closed' })
  @ApiNotFoundResponse({
    type: GroupIdNotFoundException,
    description: 'Group not found',
  })
  @Post(':groupId/close')
  async closeGroup(@Param('groupId') groupId: number): Promise<GroupDto> {
    return await this.groupsService.closeGroup(groupId);
  }

  @ApiParam({ name: 'groupId' })
  @ApiQuery({ name: 'orderId', type: String })
  @ApiOkResponse({ type: GroupDto, description: 'Order added to group' })
  @ApiNotFoundResponse({
    type: GroupIdNotFoundException,
    description: 'Group not found',
  })
  @Post(':groupId/orders')
  async addOrderToGroup(
    @Param('groupId') groupId: number,
    @Query('orderId') orderId: string,
  ): Promise<GroupDto> {
    return await this.groupsService.addOrderToGroup(groupId, orderId);
  }

  @ApiParam({ name: 'groupId' })
  @ApiOkResponse({
    type: [String],
    description: 'List of order IDs for the group',
  })
  @ApiNotFoundResponse({
    type: GroupIdNotFoundException,
    description: 'Group not found',
  })
  @Get(':groupId/orders')
  async getGroupOrders(@Param('groupId') groupId: number): Promise<string[]> {
    return await this.groupsService.getGroupOrders(groupId);
  }
}