import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Story } from './stories.data';
import { CreateStoryDto, UpdateStoryDto } from '../../dto/stories.dto';

@Injectable()
export class StoriesService {
  constructor(@InjectModel(Story.name) private storyModel: Model<Story>) {}

  // Create a new story
  async create(createStoryDto: CreateStoryDto): Promise<Story> {
    const newStory = new this.storyModel(createStoryDto);
    return newStory.save();
  }

  // Get all stories
  async findAll(): Promise<Story[]> {
    return this.storyModel.find().exec();
  }

  // Get a single story by ID
  async findOne(id: string): Promise<Story> {
    const story = await this.storyModel.findById(id).exec();
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
    return story;
  }

  // Update a story by ID
  async update(id: string, updateStoryDto: UpdateStoryDto): Promise<Story> {
    const updatedStory = await this.storyModel
      .findByIdAndUpdate(id, updateStoryDto, { new: true })
      .exec();
    if (!updatedStory) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
    return updatedStory;
  }

  // Delete a story by ID
  async remove(id: string): Promise<void> {
    const result = await this.storyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
  }
}