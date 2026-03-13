import Movie from '../models/Movie.js'

export const getAllMovies = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const filter = {};
    const name = req.query.name;
    const limit = parseInt(req.query.limit);
    const genre = req.query.genre;
    const skip = ((page - 1) * limit) || 0;

    if (genre) filter = {genre: genre}
    if (name) filter = {title : name}

    const movies = await Movie.find(filter)
        .skip(skip)
        .limit(parseInt(limit));
    const total = await Movie.countDocuments(filter)
    res.json({movies, total}).status(200)
};

export const getMovieById = async (req, res, next) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.status(200).json({success : true, movie});
};

export const getMovieStats = async (req, res, next) => {

    const total = await Movie.countDocuments();
    const byGenre = await Movie.getStatsByGenre();

    const totalRevenue = await Movie.aggregate([{
        $group: {
            _id: null,
            total: { $sum: { $multiply: ['$price', '$rentalCount'] } }
        }
    }]);

    res.status(200).json({total, totalRevenue, byGenre});
};

export const createMovie = async (req, res, next) => {
    console.log("createMovie");
    res.status(200).json({success: true, message: `Création d'un film via un formulaire`});
};

export const updateMovie = async (req, res, next) => {
    console.log("updateMovie");
    res.status(200).json({success : true, message: `Mise à jour des données du films dont l’id est ${req.params.id}, via un formulaire`});
};

export const deleteMovie = async (req, res, next) => {
    console.log("deleteMovie");
    res.status(200).json({success : true, message: `Suppression du film dont l'ID est ${req.params.id}`});
};

export const getSimilarMovies = async (req, res, next) => {
    console.log("getSimilarMovies");
    res.status(200).json({success : true, message: `les films qui ont le même genre que le film dont l’id est  ${req.params.id}`});
}