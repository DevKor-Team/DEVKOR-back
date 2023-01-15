import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';
import { TechService } from './tech.service';

@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  async findAll() {
    return this.techService.findAll();
  }

  @Get(':techId')
  async findOne(@Param('techId') techId: number) {
    return this.techService.findOne(techId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTech(@Request() req, createTechDto: CreateTechDto) {
    return this.techService.createTech(req.user.userId, createTechDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':techId')
  async updateTech(
    @Request() req,
    @Param('techId') techId: number,
    updateTechDto: UpdateTechDto,
  ) {
    const userInfo = req.user;
    const tech = await this.techService.findOne(techId);

    if (userInfo.userId !== tech.creator) {
      throw new UnauthorizedException();
    }

    return await this.techService.updateTech(techId, updateTechDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':techId')
  async deleteTech(@Request() req, @Param('techId') techId: number) {
    const userInfo = req.user;
    const tech = await this.techService.findOne(techId);

    if (userInfo.userId !== tech.creator) {
      throw new UnauthorizedException();
    }

    return await this.techService.deleteTech(techId);
  }
}
